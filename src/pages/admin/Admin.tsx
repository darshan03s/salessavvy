import { Link } from "react-router-dom";
import { Users, ShoppingBag, Building } from 'lucide-react';

const Admin = () => {
    return (
        <div className="admin-page h-[calc(100vh-48px-48px)] p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link to="/admin/users" className="card-link">
                    <div className="p-6 bg-card text-card-foreground rounded-lg border border-border flex flex-col items-center text-center">
                        <Users className="w-12 h-12 mb-4 text-primary" />
                        <h2 className="text-xl font-semibold mb-2">Users</h2>
                        <p className="text-muted-foreground">Manage all users</p>
                    </div>
                </Link>
                <Link to="/admin/products" className="card-link">
                    <div className="p-6 bg-card text-card-foreground rounded-lg border border-border flex flex-col items-center text-center">
                        <ShoppingBag className="w-12 h-12 mb-4 text-primary" />
                        <h2 className="text-xl font-semibold mb-2">Products</h2>
                        <p className="text-muted-foreground">Manage all products</p>
                    </div>
                </Link>
                <Link to="/admin/business" className="card-link">
                    <div className="p-6 bg-card text-card-foreground rounded-lg border border-border flex flex-col items-center text-center">
                        <Building className="w-12 h-12 mb-4 text-primary" />
                        <h2 className="text-xl font-semibold mb-2">Business</h2>
                        <p className="text-muted-foreground">View business analytics</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Admin;