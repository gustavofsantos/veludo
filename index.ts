export class ValidatorSuccess { }
export class ValidatorFailure {
  constructor(public reason: string) { }
}

export type EitherValidator = ValidatorSuccess | ValidatorFailure;

export function combineValidators<A>(...validators: ((input: A) => Promise<EitherValidator>)[]): (input: A) => Promise<EitherValidator> {
  return async function validator(input: A) {
    let result = new ValidatorSuccess();

    try {
      for (const v of validators) {
        result = await v(input);
        if (result instanceof ValidatorFailure) {
          return result;
        }
      }

      return result;
    } catch (err) {
      throw err;
    }
  }
}