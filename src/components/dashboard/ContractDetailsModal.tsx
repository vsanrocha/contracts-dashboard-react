import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { CalendarDays, Building2, DollarSign } from "lucide-react";
import { FC } from "react";
import { Contract } from "@/types/contract";

interface ContractDetailsModalProps {
  contract?: Contract;
  open: boolean;
  onClose: () => void;
}

const ContractDetailsModal: FC<ContractDetailsModalProps> = ({
  contract,
  open,
  onClose,
}) => {
  if (!contract) return null;

  const statusColors = {
    active: "bg-green-100 text-green-800",
    expired: "bg-red-100 text-red-800",
    pending: "bg-yellow-100 text-yellow-800",
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle>Contract Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{contract.name}</h2>
            <Badge className={statusColors[contract.status]}>
              {contract.status.charAt(0).toUpperCase() +
                contract.status.slice(1)}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                <span>Contract Value</span>
              </div>
              <p className="text-2xl font-bold">
                ${contract.amount.toLocaleString()}
              </p>
            </Card>

            <Card className="p-4 space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="h-4 w-4" />
                <span>Company</span>
              </div>
              <p className="text-2xl font-bold">{contract.clientOrSupplier}</p>
            </Card>
          </div>

          <Card className="p-4 space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              <span>Contract Duration</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Start Date</p>
                <p className="font-medium">{contract.startDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">End Date</p>
                <p className="font-medium">{contract.endDate}</p>
              </div>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContractDetailsModal;
