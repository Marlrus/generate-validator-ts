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

export type TestObject = {
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
};
