// type Something = {
//   name: string;
//   id: string;
//   items?: [
//     {
//       name: string;
//       description: string;
//     }
//   ];
// };
//
/**
 * @format email
 */
type email = string;

export type Test = {
  /**
   * Specify individual fields in items.
   *
   * @asType integer
   * @minimum 0
   */
  posInteger: number;

  /**
   * Or specify a JSON spec:
   *
   * @minItems 1
   */
  emails: email[];
  // obj: Test2;
  // something: Something;
  /**
   * @format email
   */
  optional?: string;
};

// export type Test2 = {
//   sizes: number;

//   /**
//    * Or specify a JSON spec:
//    *
//    * @items {"type":"string","format":"email"}
//    */
//   emails: string[];
// };
