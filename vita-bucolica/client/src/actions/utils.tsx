export const getFromLocalStorageOrNull = (item:string) => {
    if(localStorage.getItem(item)!== null){
      //@ts-ignore
      return JSON.parse(localStorage.getItem(item));
    } else {
      return null;
    }
  }

  export const getUserCookie = () => {
    if(localStorage.getItem("profile")!== null){
      //@ts-ignore
      return JSON.parse(localStorage.getItem("profile"));
    } else {
      return null;
    }
  }