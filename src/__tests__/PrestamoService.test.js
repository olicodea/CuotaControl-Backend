import request from "supertest";
import express from "express";
import { getLoans, addLoan } from "../controllers/PrestamosController.js";
import { findLoansByUser, createLoan } from "../services/PrestamosService.js";

jest.mock("../services/PrestamosService.js");

const app = express();
app.use(express.json());
app.get("/loans", getLoans);
app.post("/loans", addLoan);

describe("PrestamosController", () => {
    describe("getLoans", () => {
        it("should return 400 if userId is not provided", async () => {
            const response = await request(app).get("/loans");
            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                error: "El ID de usuario es requerido.",
            });
        });

        it("should return 200 and loans if userId is provided", async () => {
            const mockLoans = [{ id: 1, amount: 1000 }];
            findLoansByUser.mockResolvedValue(mockLoans);

            const response = await request(app)
                .get("/loans")
                .query({ userId: "123" });
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockLoans);
        });
    });
});
