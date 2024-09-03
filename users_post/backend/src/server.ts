import express, { Request, Response, NextFunction } from "express";

const app = express();
app.use(express.json());

const hardcodedName = "BrianKim";
const hardcodedPassword = "Kimathi@2023";

app.post("/api/auth", (req: Request, res: Response) => {
  const { name, password } = req.body;

  if (name === hardcodedName && password === hardcodedPassword) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
