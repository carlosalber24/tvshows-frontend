import { IParamsList } from '../interfaces/home';

const Helpers = {
  /*
    * Serialize object for Url params
    * @param {Object} data.
    */
  serialize(data: IParamsList): string {
    let str = "";
    for (const key in data) {
      if (data[key] !== null) {
        if (str !== "") {
          str += "&";
        }
        str += key + "=" + encodeURIComponent(data[key]);
      }
    }
    return str;
  }
}

export default Helpers;
