import YearlyReport from "./components/YearlyReport";
import MonthlyReport from "./components/MonthlyReport";
import DailyReport from "./components/DailyReport";
import OverallReport from "./components/OverallReport";

const AdminBusiness = () => {
    return (
        <div className="bg-background py-8">
            <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                        Business Analytics
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Track your business performance across different time periods
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <YearlyReport />
                    <MonthlyReport />
                    <DailyReport />
                    <OverallReport />
                </div>
            </div>
        </div>
    );
};

export default AdminBusiness;