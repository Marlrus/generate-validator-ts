/**
 * Email formatted string
 *
 * @format email
 */
type Email = string;

/**
 * Unix Time in ms
 *
 * @asType integer
 */
type Timestamp = number;

/**
 * uuid value
 *
 * @format uuid
 */
type UUID = string;

type Maybe<T> = T | null;

export type Something = {
  name?: Maybe<string>;
  arr?: Maybe<string[]>;
  nested?: Maybe<{
    name?: Maybe<string>;
    lastName?: Maybe<string>;
  }>;
};

export type Test = {
  id: UUID;
  /**
   * Specify individual fields in items.
   *
   * @asType integer
   * @minimum 0
   */
  posInteger: number;
  ts: Timestamp;
  /**
   * @format float
   */
  float: number;
  /**
   * @pattern ^a
   */
  startsWithA: string;
  email: Email;
  /**
   * Or specify a JSON spec:
   *
   * @minItems 1
   */
  emails: Email[];
  // obj: Test2;
  something?: Maybe<Something>;
  optional?: Maybe<string>;
  nested: {
    nestedEmail: Email;
  };
};
