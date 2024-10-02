import axios from "axios";
import { API_URL } from "./env";
import Toast from "react-native-simple-toast";
import { localStorage } from "../../components/localstorageProvider";
export const amountRegex = /^[0-9]+(\.[0-9]{1,2})?$/;
export async function getUserDetails() {
  const userdata = await localStorage.getItemObject("user");

  if (userdata) {
    return userdata;
  } else {
    return null;
  }
}
export const appLogout = async (navigation) => {
  const passwordLocal = await localStorage.getItemString("password");
  if (passwordLocal) {
    localStorage.removeItem("user");
    localStorage.removeItem("userType");
    localStorage.removeItem("accessToken");
  } else {
    localStorage.clear();
  }
  postApiData1(`${API_URL}${"/auth/logout"}`, {}, navigation).then((res) => {
    console.log("logout done by api");
    global.userType = null;
    global.accessToken = null;
    setTimeout(() => {
      navigation.navigate("LoginScreen");
    }, 300);
  });
};
export const postReq = async (endpoint, data) => {
  try {
    const url = API_URL + endpoint;
    return await axios
      .post(url, data, { withCredentials: true })
      .then((response) => {
        const _data = response.data;

        return {
          status:
            response.status === 201 || response.status === 200 ? true : false,
          data: _data,
        };
      });
  } catch (err) {
    Toast.showWithGravity("Wrong email or password!", Toast.LONG, Toast.CENTER);
    return false;
  }
};

export async function postData(url, data, navigation) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${global.accessToken}`,
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const _data = await response.json();
  if (_data.statusCodeCode == 401) {
    Toast.showWithGravity(
      _data?.message ? _data?.message : "",
      Toast.LONG,
      Toast.CENTER
    );
    appLogout(navigation);
    return false;
  }
  return {
    status: response.status === 201 || response.status === 200 ? true : false,
    data: _data,
  };
}
export async function getData(url, navigation) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Set content type for the request
        Authorization: `Bearer ${global.accessToken}`, // Include the token in the Authorization header
      },
      credentials: "include",
    });

    const _data = await response.json();

    if (_data.statusCode == 401) {
      Toast.showWithGravity(
        _data?.message ? _data?.message : "",
        Toast.LONG,
        Toast.CENTER
      );
      appLogout(navigation);
      return;
    }
    return {
      status: response.status === 201 || response.status === 200,
      data: _data,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      status: false,
      data: null,
    };
  }
}

export async function deleteApiData(url, data, navigation) {
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${global.accessToken}`,
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const _data = await response.json();
  if (_data.statusCode == 401) {
    Toast.showWithGravity(
      _data?.message ? _data?.message : "",
      Toast.LONG,
      Toast.CENTER
    );
    appLogout(navigation);
    return;
  }
  return {
    status: response.status === 201 || response.status === 200 ? true : false,
    data: _data,
  };
}

export async function postApiData1(url, data, navigation) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${global.accessToken}`,
      },
      credentials: "include",
      body: data,
    });

    return {
      status: true,
      data: "",
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      status: false,
      data: null,
    };
  }
}

export async function postApiData(url, data, navigation) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${global.accessToken}`,
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const _data = await response.json();

    if (_data.statusCode == 401) {
      Toast.showWithGravity(
        _data?.message ? _data?.message : "",
        Toast.LONG,
        Toast.CENTER
      );
      appLogout(navigation);
      return;
    }
    return {
      status: response.status === 201 || response.status === 200 ? true : false,
      data: _data,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      status: false,
      data: null,
    };
  }
}

export async function patchApiData(url, data, navigation) {
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${global.accessToken}`,
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const _data = await response.json();

    if (_data.statusCode == 401) {
      Toast.showWithGravity(
        _data?.message ? _data?.message : "",
        Toast.LONG,
        Toast.CENTER
      );
      appLogout(navigation);
      return;
    }
    return {
      status: response.status === 201 || response.status === 200 ? true : false,
      data: _data,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      status: false,
      data: null,
    };
  }
}

export async function putApiData(url, data, navigation) {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${global.accessToken}`,
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const _data = await response.json();

    return {
      status: response.status === 201 || response.status === 200 ? true : false,
      data: _data,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      status: false,
      data: null,
    };
  }
}

export async function getApiData(url, navigation) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${global.accessToken}`,
    },
    credentials: "include",
  });
  // hideLoader();
  const _data = await response.json();
  if (_data.statusCode == 401) {
    Toast.showWithGravity(
      _data?.message ? _data?.message : "",
      Toast.LONG,
      Toast.CENTER
    );
    appLogout(navigation);
    return;
  }
  return {
    status: response.status === 200 ? true : false,
    data: _data,
  };
}
