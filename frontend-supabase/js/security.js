import client from "./services/supabase.js";
const loginNavElem = document.getElementById("nav-login");
const userInfosSpanElem = document.getElementById("nav-userinfos");

const token = localStorage.getItem("token");
export const user = {
  id: null,
};

if (token) {
  if (window.location.pathname === "/login.html") {
    window.location.href = "/";
  }

  if (userInfosSpanElem) {
    client.auth.getUser().then(({ data: { user: userSupabase } }) => {
      const textNode = document.createTextNode(userSupabase.id);
      Object.assign(user, userSupabase);
      userInfosSpanElem.appendChild(textNode);
      userInfosSpanElem.style.display = "block";
    });
  }
} else {
  if (loginNavElem) loginNavElem.style.display = "block";
}
