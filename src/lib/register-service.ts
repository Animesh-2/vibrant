export async function registerUser(data: {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  city: string;
}) {
  const res = await fetch("http://10.11.7.87:5000/api/auth/register", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  return json;
}
