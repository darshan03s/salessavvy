import { BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

const OverallReport = () => {
    const [isOpen, setIsOpen] = useState(false);
    const adminBusinessUrl = import.meta.env.VITE_API_URL + "/admin/business"

    const OverallReportModal = () => {
        // eslint-disable-next-line
        const [report, setReport] = useState<any>(null)

        function showReport() {
            try {
                axios.get(adminBusinessUrl + `/overall`, {
                    withCredentials: true
                }).then(res => {
                    setReport(res.data)
                })
            } catch (err) {
                console.error(err)
                toast.error("Could not fetch report")
                setIsOpen(false);
            }
        }

        useEffect(() => {
            showReport()
        }, [])


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
                            <span className="font-bold">Total Business: {report.totalBusiness}</span>
                        </>
                        :
                        "Could not get report"
                    }
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    };
    return (
        <>
            {isOpen ? <OverallReportModal /> : null}
            <div onClick={() => setIsOpen(true)} className="cursor-pointer bg-background rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-border">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                        <BarChart3 className="h-6 w-6 text-purple-600" />
                    </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Overall Report</h3>
                <p className="text-foreground/50 text-sm mb-4">Complete business performance summary</p>
            </div>
        </>
    );
};

export default OverallReport