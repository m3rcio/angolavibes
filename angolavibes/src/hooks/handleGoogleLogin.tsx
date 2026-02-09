export async function handleGoogleLogin(token: string | undefined) {
  if (!token) return;

  const response = await fetch("http://localhost:5000/api/auth/google", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token })
  });

  const data = await response.json();

  if (response.ok) {
    localStorage.setItem("token", data.token);
    
  }
}