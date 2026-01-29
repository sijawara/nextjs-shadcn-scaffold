"use client"

import Link from "next/link"
import { IconBrandFacebook, IconBrandTwitter, IconBrandInstagram, IconBrandGithub, IconMail } from "@tabler/icons-react"

export function Footer() {
    return (
        <footer className="w-full border-t bg-background">
            <div className="container mx-auto px-4 py-12 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold tracking-tight">Our Platform</h3>
                        <p className="text-sm text-foreground/70 leading-relaxed max-w-xs">
                            Building the future of digital experiences with premium tools and curated collections.
                        </p>
                        <div className="flex items-center space-x-4">
                            <Link href="#" className="text-foreground/50 hover:text-primary transition-colors">
                                <IconBrandTwitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-foreground/50 hover:text-primary transition-colors">
                                <IconBrandInstagram className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-foreground/50 hover:text-primary transition-colors">
                                <IconBrandGithub className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Links Section 1 */}
                    <div>
                        <h4 className="font-semibold mb-4 uppercase text-xs tracking-widest text-foreground/50">Product</h4>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Features</Link></li>
                            <li><Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Integrations</Link></li>
                            <li><Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Pricing</Link></li>
                            <li><Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Changelog</Link></li>
                        </ul>
                    </div>

                    {/* Links Section 2 */}
                    <div>
                        <h4 className="font-semibold mb-4 uppercase text-xs tracking-widest text-foreground/50">Support</h4>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Documentation</Link></li>
                            <li><Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Help Center</Link></li>
                            <li><Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Resources</Link></li>
                            <li><Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter Section */}
                    <div className="space-y-4">
                        <h4 className="font-semibold uppercase text-xs tracking-widest text-foreground/50">Stay Updated</h4>
                        <p className="text-sm text-foreground/70">Subscribe to our newsletter for the latest updates and offers.</p>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <IconMail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    className="w-full bg-muted/30 border-2 border-transparent focus:border-primary/50 focus:bg-background h-10 pl-10 pr-4 rounded-lg text-sm transition-all outline-none"
                                />
                            </div>
                            <button className="h-10 px-4 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity">
                                Join
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-foreground/40 font-medium">
                        &copy; {new Date().getFullYear()} Our Platform. All rights reserved. Built with precision.
                    </p>
                    <div className="flex items-center space-x-6 text-xs text-foreground/40 font-medium">
                        <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
