import { Request, Response } from "express";
import { ICustomerRepository } from "../../domain/interfaces/ICustomerRepository";
import { PrismaCustomerRepository } from "../../infrastructure/repositories/PrismaCustomerReposistory";

export class CustomerController {
  private repository: ICustomerRepository;

  constructor() {
    this.repository = new PrismaCustomerRepository(); // Utiliza o repositório do Prisma
  }

  async getCustomerById(req: Request, res: Response) {
    const { customerId } = req.params;

    try {
      const customer = await this.repository.findById(Number(customerId));

      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }

      return res.json(customer);
    } catch (error) {
      console.error("Error fetching customer:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async createCustomer(req: Request, res: Response) {
    const customerData = req.body;

    try {
      const createdCustomer = await this.repository.create(customerData);
      return res.status(201).json(createdCustomer);
    } catch (error) {
      console.error("Error creating customer:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateCustomer(req: Request, res: Response) {
    const { customerId } = req.params;
    const customerData = req.body;

    try {
      const updatedCustomer = await this.repository.update(
        Number(customerId),
        customerData
      );

      if (!updatedCustomer) {
        return res.status(404).json({ error: "Customer not found" });
      }

      return res.json(updatedCustomer);
    } catch (error) {
      console.error("Error updating customer:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteCustomer(req: Request, res: Response) {
    const { customerId } = req.params;

    try {
      const deleted = await this.repository.delete(Number(customerId));

      if (!deleted) {
        return res.status(404).json({ error: "Customer not found" });
      }

      return res.status(204).send();
    } catch (error) {
      console.error("Error deleting customer:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
