import YearlyReport from "./components/YearlyReport";
import MonthlyReport from "./components/MonthlyReport";
import DailyReport from "./components/DailyReport";
import OverallReport from "./components/OverallReport";

const AdminBusiness = () => {
    return (
        <div className="bg-background py-8">
            <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-lg md:text-2xl font-bold text-foreground mb-2">
                        Business Analytics
                    </h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <OverallReport />
                    <YearlyReport />
                    <MonthlyReport />
                    <DailyReport />
                </div>
            </div>
        </div>
    );
};

export default AdminBusiness;