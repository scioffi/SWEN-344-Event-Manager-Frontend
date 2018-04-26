
export const isAdmin = () => {
    if (sessionStorage.getItem("permission") === "admin"){ // Call from Code
        return true;
	} else{
        return false;
    }
};
