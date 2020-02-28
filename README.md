# Veludo

Asynchronous validations with TypeScript

#### Why?

```typescript
import { ValidatorSuccess, ValidatorFailure, combineValidators } from "veludo";

const hasMinLengthValidator = (failReason: string, minLength: number) =>
  async (text: string) => text.length >= minLength ?
    new ValidatorSuccess() : new ValidatorFailure(failReason);

const hasMinNumbersValidator = (failReason: string, minNumbersQuantity: number) =>
  async (text: string) =>
    [...text].reduce((count, char) => /[0-9]/.test(char) ? count += 1 : count, 0) >= minNumbersQuantity ?
      new ValidatorSuccess() : new ValidatorFailure(failReason);

const validator = combineValidators(
  hasMinLengthValidator('your text is too short', 6),
  hasMinNumbersValidator('password must have at least 4 digits', 4)
);

validator('abc9832')
  .then((validationResult) => {
    if (validationResult instanceof ValidatorFailure) {
      return console.log('Fail: ' + validationResult.reason);
    }

    return console.log('Success!')
  })
```
