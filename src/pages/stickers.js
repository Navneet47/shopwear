import React from 'react'
import Link from 'next/link'
function stickers() {
    // "https://m.media-amazon.com/images/I/912vTYEybGL._SL1500_.jpg"
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    <Link href={"/product/the-catylyzer"} className="group shadow-lg">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                            <img src="https://m.media-amazon.com/images/I/912vTYEybGL._SL1500_.jpg" alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." className="h-full w-full object-cover object-center group-hover:opacity-75"/>
                        </div>
                        <h3 className="mt-4 text-sm text-gray-700">Hoodie</h3>
                        <p className="mt-1 text-lg font-medium text-gray-900">₹499</p>
                    </Link>
                    <Link href={"/product/the-catylyzer"} className="group shadow-lg">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                            <img src="https://m.media-amazon.com/images/I/912vTYEybGL._SL1500_.jpg" alt="Olive drab green insulated bottle with flared screw lid and flat top." className="h-full w-full object-cover object-center group-hover:opacity-75"/>
                        </div>
                        <h3 className="mt-4 text-sm text-gray-700">Hoodie</h3>
                        <p className="mt-1 text-lg font-medium text-gray-900">₹499</p>

                    </Link>
                    <Link href={"/product/the-catylyzer"} className="group shadow-lg">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                            <img src="https://m.media-amazon.com/images/I/912vTYEybGL._SL1500_.jpg" alt="Person using a pen to cross a task off a productivity paper card." className="h-full w-full object-cover object-center group-hover:opacity-75"/>
                        </div>
                        <h3 className="mt-4 text-sm text-gray-700">Hoodie</h3>
                        <p className="mt-1 text-lg font-medium text-gray-900">₹499</p>

                    </Link>
                    <Link href={"/product/the-catylyzer"} className="group shadow-lg">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                            <img src="https://m.media-amazon.com/images/I/912vTYEybGL._SL1500_.jpg" alt="Hand holding black machined steel mechanical pencil with brass tip and top." className="h-full w-full object-cover object-center group-hover:opacity-75"/>
                        </div>
                        <h3 className="mt-4 text-sm text-gray-700">Hoodie</h3>
                        <p className="mt-1 text-lg font-medium text-gray-900">₹499</p>
                    </Link>
                    <Link href={"/product/the-catylyzer"} className="group shadow-lg">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                            <img src="https://m.media-amazon.com/images/I/912vTYEybGL._SL1500_.jpg" alt="Hand holding black machined steel mechanical pencil with brass tip and top." className="h-full w-full object-cover object-center group-hover:opacity-75"/>
                        </div>
                        <h3 className="mt-4 text-sm text-gray-700">Hoodie</h3>
                        <p className="mt-1 text-lg font-medium text-gray-900">₹499</p>
                    </Link>
                    <Link href={"/product/the-catylyzer"} className="group shadow-lg">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                            <img src="https://m.media-amazon.com/images/I/912vTYEybGL._SL1500_.jpg" alt="Hand holding black machined steel mechanical pencil with brass tip and top." className="h-full w-full object-cover object-center group-hover:opacity-75"/>
                        </div>
                        <h3 className="mt-4 text-sm text-gray-700">Hoodie</h3>
                        <p className="mt-1 text-lg font-medium text-gray-900">₹499</p>
                    </Link>
                    <Link href={"/product/the-catylyzer"} className="group shadow-lg">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                            <img src="https://m.media-amazon.com/images/I/912vTYEybGL._SL1500_.jpg" alt="Hand holding black machined steel mechanical pencil with brass tip and top." className="h-full w-full object-cover object-center group-hover:opacity-75"/>
                        </div>
                        <h3 className="mt-4 text-sm text-gray-700">Hoodie</h3>
                        <p className="mt-1 text-lg font-medium text-gray-900">₹499</p>
                    </Link>
                    <Link href={"/product/the-catylyzer"} className="group shadow-lg">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                            <img src="https://m.media-amazon.com/images/I/912vTYEybGL._SL1500_.jpg" alt="Hand holding black machined steel mechanical pencil with brass tip and top." className="h-full w-full object-cover object-center group-hover:opacity-75"/>
                        </div>
                        <h3 className="mt-4 text-sm text-gray-700">Hoodie</h3>
                        <p className="mt-1 text-lg font-medium text-gray-900">₹499</p>
                    </Link>

                    {/* <!-- More products... --> */}
                </div>
            </div>
        </div>
    )
}

export default stickers