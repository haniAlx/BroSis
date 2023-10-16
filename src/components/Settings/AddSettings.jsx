import React from "react";
import swal from "sweetalert";

async function addSetting( title,value,url,jwt ) {
    console.log(title,'Add Setting function')
    let item =
    {
        value,
    };
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            "Authorization": `Bearer ${jwt}`
        },
        body: JSON.stringify(item),
    };
        try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        localStorage.setItem("message", JSON.stringify(result["message"]));
        const mess = localStorage.getItem("message");
        console.log(mess);
        if (response.ok) {
            swal("Successful",  `${mess}`, "success", {
                buttons: false,
                timer: 2000,
            });
            // setPop(false);
        } else {
            console.log("failed");
            swal(`Failed To Register ${mess}`, "Error", "error");
        }
    } catch (error) {
        console.error(error);
    }
}
async function editSetting( title,value,url,jwt ) {
    console.log(title,'update Setting function')
    let item =
    {
        value,
    };
    const options = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            "Authorization": `Bearer ${jwt}`
        },
        body: JSON.stringify(item),
    };
        try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        localStorage.setItem("message", JSON.stringify(result["message"]));
        const mess = localStorage.getItem("message");
        console.log(mess);
        if (response.ok) {
            swal("Successful",  `${mess}`, "success", {
                buttons: false,
                timer: 2000,
            });
            // setPop(false);
        } else {
            console.log("failed");
            swal(`Failed To Register ${mess}`, "Error", "error");
        }
    } catch (error) {
        console.error(error);
    }
}
export  {addSetting, editSetting}