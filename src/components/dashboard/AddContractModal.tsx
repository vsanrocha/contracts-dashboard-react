import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import DatePickerWithRange from "../ui/date-picker-with-range";
import { addDays } from "date-fns";

interface AddContractModalProps {
  open?: boolean;
  onClose?: () => void;
  onSubmit?: (data: ContractFormData) => void;
}

interface ContractFormData {
  contractName: string;
  contractType: string;
  startDate: Date;
  endDate: Date;
  value: string;
  description: string;
}

const AddContractModal = ({
  open = true,
  onClose = () => {},
  onSubmit = () => {},
}: AddContractModalProps) => {
  const [formData, setFormData] = React.useState<ContractFormData>({
    contractName: "",
    contractType: "",
    startDate: new Date(),
    endDate: addDays(new Date(), 30),
    value: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white w-[95vw] sm:w-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Contract</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="contractName">Contract Name</Label>
              <Input
                id="contractName"
                placeholder="Enter contract name"
                value={formData.contractName}
                onChange={(e) =>
                  setFormData({ ...formData, contractName: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="contractType">Contract Type</Label>
              <Select
                value={formData.contractType}
                onValueChange={(value) =>
                  setFormData({ ...formData, contractType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select contract type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="service">Service Agreement</SelectItem>
                  <SelectItem value="license">License Agreement</SelectItem>
                  <SelectItem value="subscription">Subscription</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Contract Duration</Label>
              <DatePickerWithRange
                from={formData.startDate}
                to={formData.endDate}
                onSelect={(range) => {
                  if (range?.from && range?.to) {
                    setFormData({
                      ...formData,
                      startDate: range.from,
                      endDate: range.to,
                    });
                  }
                }}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="value">Contract Value</Label>
              <Input
                id="value"
                type="number"
                placeholder="Enter contract value"
                value={formData.value}
                onChange={(e) =>
                  setFormData({ ...formData, value: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter contract description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="h-24"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Contract</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddContractModal;
