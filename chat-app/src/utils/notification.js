export default function showDesktopNotification(chat, username) {
   if (!window.Notification) {
      return console.log("Browser not supported notification")
   }
   if (Notification.permission !== "granted") {
      return console.log("User blocked notification")
   }
   var notify = new Notification(`${username}`, {
      body: `${chat}`,
   })
}

export const requestPermission = () => {
   if (!window.Notification) {
      return console.log("Browser not support notification")
   }
   Notification.requestPermission().then((p) => {
      if (p !== "granted") {
         console.log("User blocked notification");
      }
   })
}