import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
export type Constructor<T> = new (...args: any[]) => T;
export type AbstractConstructor<T = object> = abstract new (
  ...args: any[]
) => T;

export interface CanDisable {
  disabled: boolean;
}

type CanDisableCtor = Constructor<CanDisable> & AbstractConstructor<CanDisable>;

export function mixinDisabled<T extends AbstractConstructor<object>>(
  base: T
): CanDisableCtor & T;
export function mixinDisabled<T extends Constructor<object>>(
  base: T
): CanDisableCtor & T {
  return class extends base {
    get disabled(): boolean {
      return this._disabled;
    }
    set disabled(value: BooleanInput) {
      this._disabled = coerceBooleanProperty(value);
    }
    private _disabled = false;

    constructor(...args: any[]) {
      super(...args);
    }
  };
}
