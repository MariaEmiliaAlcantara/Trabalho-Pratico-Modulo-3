export interface IUser {
  name: string;
  email: string;
}

export async function getUserEndpoint(): Promise<IUser> {
  return fetch("http://localhost:3001/auth/user", {
    credentials: "same-origin",
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(handleResponse);
}

export async function signInEndpoint(
  email: string,
  password: string
): Promise<IUser> {
  return fetch("http://localhost:3001/auth/login", {
    credentials: "same-origin",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
}

const handleResponse = (resp: Response) => {
  if (resp.ok) {
    return resp.json();
  } else {
    throw new Error(resp.statusText);
  }
};
