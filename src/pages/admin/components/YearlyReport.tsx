import { Calendar } from "lucide-react";
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

const YearlyReport = () => {
    const [isOpen, setIsOpen] = useState(false);
    const adminBusinessUrl = import.meta.env.VITE_API_URL + "/admin/business"

    const YearlyReportModal = () => {
        // eslint-disable-next-line
        const [report, setReport] = useState<any>(null)
        const [year, setYear] = useState('');
        if (!isOpen) return null;

        function showReport() {
            try {
                axios.get(adminBusinessUrl + `/yearly?year=${year}`, {
                    withCredentials: true
                }).then(res => {
                    console.log(res)
                    setReport(res.data)
                })
            } catch (err) {
                console.error(err)
                toast.error("Could not fetch report")
                setIsOpen(false);
                setYear('');
            }
        }

        const handleSubmit = () => {
            if (year) {
                showReport()
            }
        };


        return (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Generate Yearly Report</DialogTitle>
                        <DialogDescription>
                            Annual performance report.
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
                                <Label htmlFor="year" className="text-right">
                                    Year
                                </Label>
                                <Input
                                    id="year"
                                    type="number"
                                    min="2000"
                                    max="2025"
                                    placeholder="Year"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
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
            {isOpen ? <YearlyReportModal /> : null}
            <div onClick={() => setIsOpen(true)} className="cursor-pointer bg-background rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-border">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                        <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Yearly Report</h3>
                <p className="text-foreground/50 text-sm mb-4">Yearly performance summary</p>
            </div>
        </>
    );
};

export default YearlyReport