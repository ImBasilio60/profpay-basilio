import create from "./categories/categories/create.js";
import read from "./categories/categories/read.js";
import readNotification from "./notifications/read.js";
import createNotification from "./notifications/create.js";
read(() => {
  readNotification();
});

create(() => read(readNotification), createNotification);
