import { createClient } from "@/utils/supabase/server-utils";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    ImageIcon,
    Plus,
    AlertCircle,
    Calendar,
    FileText,
    ShieldCheck,
    LayoutDashboard,
    User,
    Bell,
    Settings,
    LogOut,
    Search
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { logout } from "@/app/logout/actions";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

// Strict TypeScript interfaces based on the schema in sql_instructions.md
interface ImageRecord {
    id: string;
    created_at: string;
    user_id: string;
    url: string;
    name: string;
    metadata: {
        size?: number;
        type?: string;
        dimensions?: {
            width: number;
            height: number;
        };
    } | null;
}

export default async function ImagesPage() {
    const supabase = await createClient();

    if (!supabase) {
        redirect("/login");
    }

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Fetch data directly from Supabase on the server
    const { data: images, error } = await supabase
        .from("images")
        .select("*")
        .order("created_at", { ascending: false });

    const userInitials = user.email?.split("@")[0].substring(0, 2).toUpperCase() || "US";

    return (
        <div className="flex min-h-screen bg-zinc-50 dark:bg-black">
            {/* Sidebar - Consistent with Dashboard */}
            <aside className="hidden w-64 border-r border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950 md:flex flex-col">
                <div className="flex items-center gap-2 mb-10 px-2">
                    <div className="h-8 w-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                        <ShieldCheck className="text-white dark:text-black h-5 w-5" />
                    </div>
                    <span className="font-bold text-xl tracking-tight dark:text-white">SnapBase</span>
                </div>

                <nav className="flex-1 space-y-1">
                    <Link href="/dashboard" className="block">
                        <Button variant="ghost" className="w-full justify-start gap-3 h-11 px-3 text-zinc-500 hover:text-black dark:hover:text-white">
                            <LayoutDashboard className="h-4 w-4" />
                            Dashboard
                        </Button>
                    </Link>
                    <Button variant="secondary" className="w-full justify-start gap-3 h-11 px-3 bg-zinc-100 dark:bg-zinc-900">
                        <ImageIcon className="h-4 w-4" />
                        My Images
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 h-11 px-3 text-zinc-500 hover:text-black dark:hover:text-white">
                        <User className="h-4 w-4" />
                        Profile
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 h-11 px-3 text-zinc-500 hover:text-black dark:hover:text-white">
                        <Settings className="h-4 w-4" />
                        Settings
                    </Button>
                </nav>

                <div className="mt-auto pt-6 border-t border-zinc-200 dark:border-zinc-800">
                    <form action={logout}>
                        <Button variant="ghost" type="submit" className="w-full justify-start gap-3 h-11 px-3 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10">
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </Button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="h-16 border-b border-zinc-200 bg-white px-8 flex items-center justify-between dark:border-zinc-800 dark:bg-zinc-950">
                    <div className="flex-1 max-w-md">
                        <Input
                            placeholder="Search images..."
                            className="h-9 bg-zinc-50 dark:bg-zinc-900 border-none"
                            icon={<Search className="h-4 w-4" />}
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <Avatar fallback={userInitials} className="cursor-pointer hover:ring-2 ring-zinc-200 dark:ring-zinc-800 transition-all" />
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                            <div>
                                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">My Photo Library</h1>
                                <p className="text-zinc-500 dark:text-zinc-400">Manage and view your uploaded snapshots</p>
                            </div>
                            <Button className="font-semibold shadow-md active:scale-95 transition-transform gap-2">
                                <Plus className="h-4 w-4" />
                                Upload Image
                            </Button>
                        </div>

                        {/* Error Handling */}
                        {error && (
                            <Card className="p-8 border-red-100 bg-red-50/50 dark:bg-red-900/10 dark:border-red-900/20 flex flex-col items-center text-center gap-4">
                                <AlertCircle className="h-12 w-12 text-red-500" />
                                <div>
                                    <h3 className="text-lg font-bold text-red-900 dark:text-red-400">Failed to load images</h3>
                                    <p className="text-red-600 dark:text-red-500/80">{error.message}</p>
                                </div>
                                <Button variant="outline" className="mt-2 border-red-200 text-red-700 hover:bg-red-100 dark:border-red-900 dark:text-red-400">
                                    Try Again
                                </Button>
                            </Card>
                        )}

                        {/* No Data Found State */}
                        {!error && (!images || images.length === 0) && (
                            <Card className="p-16 border-dashed border-2 flex flex-col items-center text-center gap-4 bg-zinc-50/50 dark:bg-zinc-900/20">
                                <div className="h-20 w-20 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center">
                                    <ImageIcon className="h-10 w-10 text-zinc-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white">No images found</h3>
                                    <p className="text-zinc-500 max-w-sm mt-2">
                                        Your photo library is empty. Start by uploading your first snapshot to see it here.
                                    </p>
                                </div>
                                <Button className="mt-4 gap-2">
                                    <Plus className="h-4 w-4" />
                                    Upload First Image
                                </Button>
                            </Card>
                        )}

                        {/* High-Performance Data Display */}
                        {!error && images && images.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {images.map((image: ImageRecord) => (
                                    <Card key={image.id} className="group overflow-hidden border-zinc-200 dark:border-zinc-800 hover:shadow-xl transition-all duration-300">
                                        <div className="relative aspect-square bg-zinc-100 dark:bg-zinc-900">
                                            <Image
                                                src={image.url}
                                                alt={image.name}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                                        </div>
                                        <div className="p-4 bg-white dark:bg-zinc-950">
                                            <h4 className="font-bold text-zinc-900 dark:text-white truncate" title={image.name}>
                                                {image.name}
                                            </h4>
                                            <div className="flex items-center gap-4 mt-3 text-xs text-zinc-500 dark:text-zinc-400">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {new Date(image.created_at).toLocaleDateString()}
                                                </div>
                                                {image.metadata?.size && (
                                                    <div className="flex items-center gap-1">
                                                        <FileText className="h-3 w-3" />
                                                        {(image.metadata.size / 1024).toFixed(1)} KB
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
