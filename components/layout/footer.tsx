import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container px-6 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold">About Us</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              We are dedicated to providing exceptional real estate services, helping you find your perfect property.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="flex flex-col mt-4 space-y-2 text-sm">
              <Link href="/properties" className="hover:underline">Properties</Link>
              <Link href="/about" className="hover:underline">About Us</Link>
              <Link href="/contact" className="hover:underline">Contact</Link>
              <Link href="/blog" className="hover:underline">Blog</Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="flex flex-col mt-4 space-y-2 text-sm">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>123 Real Estate St, City</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>+1 234 567 890</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>contact@realestate.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex mt-4 space-x-4">
              <Link href="#" className="hover:text-primary">
                <Facebook className="w-6 h-6" />
              </Link>
              <Link href="#" className="hover:text-primary">
                <Twitter className="w-6 h-6" />
              </Link>
              <Link href="#" className="hover:text-primary">
                <Instagram className="w-6 h-6" />
              </Link>
              <Link href="#" className="hover:text-primary">
                <Linkedin className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200" />

        <div className="flex flex-col items-center justify-between sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2024 RealEstate. All rights reserved.
          </p>
          <div className="flex mt-4 space-x-4 text-sm sm:mt-0">
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link href="/terms" className="hover:underline">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
