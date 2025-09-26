import { Clock } from "lucide-react";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { toast } from "sonner";

const DailyReport = () => {
    const [isOpen, setIsOpen] = useState(false);
    const adminBusinessUrl = import.meta.env.VITE_API_URL + "/admin/business"

    const DailyReportModal = () => {
        // eslint-disable-next-line
        const [report, setReport] = useState<any>(null)
        const [date, setDate] = useState('');
        if (!isOpen) return null;

        function showReport() {
            try {
                axios.get(adminBusinessUrl + `/daily?date=${date}`, {
                    withCredentials: true
                }).then(res => {
                    setReport(res.data)
                })
            } catch (err) {
                console.error(err)
                toast.error("Could not fetch report")
                setIsOpen(false);
                setDate('')
            }
        }

        const handleSubmit = () => {
            if (date) {
                showReport()
            }
        };


        return (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Generate Daily Report</DialogTitle>
                        <DialogDescription>
                            Daily performance report.
                        </DialogDescription>
                    </DialogHeader>
                    {report ?
                        <>
                            {
                                Object.entries(report.categorySales).map(([k, v]) => {
                                    // @ts-expect-error unknown
                                    return <span key={k}>{k} : {v}</span>;
                                })
                            }
                            <span className="font-bold">Total Revenue: {report.totalRevenue}</span>
                        </>
                        :
                        <div className="grid gap-4 py-4">
                            <div className="flex flex-col items-center gap-4">
                                <Label htmlFor="date" className="text-right">
                                    Date
                                </Label>
                                <Input
                                    id="date"
                                    type="date"
                                    placeholder="Date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSubmit();
                                        }
                                    }}
                                />
                            </div>
                        </div>}
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                            Close
                        </Button>
                        {!report ?
                            <Button onClick={handleSubmit}>Generate Report</Button> : null}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    };
    return (
        <>
            {isOpen ? <DailyReportModal /> : null}
            <div onClick={() => setIsOpen(true)} className="cursor-pointer bg-background rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-border">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-orange-100 rounded-lg">
                        <Clock className="h-6 w-6 text-orange-600" />
                    </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Daily Report</h3>
                <p className="text-foreground/50 text-sm mb-4">Performance based on date</p>
            </div>
        </>
    );
};

export default DailyReport