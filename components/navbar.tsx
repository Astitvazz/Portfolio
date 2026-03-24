"use client"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import React from "react"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import ThemeToggle from "@/components/ThemeToggle"

export default function Navbar() {
    const [open, setOpen] = React.useState(false);
    return (
        <header className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

                {/* Logo */}
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <Link href="/" className="text-xl  font-bold">

                        Astitva
                    </Link>
                </div>


                {/* Desktop Menu */}
                <NavigationMenu className="hidden md:flex ">
                    <NavigationMenuList className="gap-6">
                        {["Home", "Services", "Projects", "Contact", "Blogs", "Skills"].map((item) => (
                            <NavigationMenuItem key={item}>
                                <NavigationMenuLink
                                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition"
                                >
                                    {item}
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Mobile Menu */}
                

                <div className="flex items-center gap-2">
                    <ThemeToggle />

                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <nav className="mt-10 flex flex-col gap-6">
                                {["Home", "Services", "Projects", "Contact", "Skills", "Blogs"].map((item) => (
                                    <Link
                                        key={item}
                                        href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                        className="text-lg font-medium pl-4"
                                        onClick={() => setOpen(false)}
                                    >
                                        {item}
                                    </Link>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>

            </div>
        </header>
    )
}
