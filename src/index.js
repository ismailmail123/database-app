const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "../.env") });

const express = require("express");

const app = express();

const { cors } = require("./middlewares/cors")
const authRouter = require("./routes/auth.root")
const progressRouter = require("./routes/progress.root")
const materiRouter = require("./routes/materi.root")
const sub_babRouter = require("./routes/sub_bab.root")
const babRouter = require("./routes/bab.root")
const modepembelaranRouter = require("./routes/modepembelajaran.root")
const kelasRouter = require("./routes/kelas.root")
const matapelajaranRouter = require("./routes/matapelajaran.root")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors);

if (!process.env.JWT_SECRET) {
    console.error(
        "JWT_SECRET is not provided, fill it with random string or generate it using 'openssl rand -base64/-hex 32'"
    );
    process.exit(1);
}

app.use("/api/auth", authRouter)
app.use("/api/progress", progressRouter)
app.use("/api/materis", materiRouter)
app.use("/api/subbabs", sub_babRouter)
app.use("/api/babs", babRouter)
app.use("/api/modes", modepembelaranRouter)
app.use("/api/kelas", kelasRouter)
app.use("/api/mapels", matapelajaranRouter)

app.listen(process.env.SERVER_PORT || 3000, () => {
    console.log("Server Running");
});