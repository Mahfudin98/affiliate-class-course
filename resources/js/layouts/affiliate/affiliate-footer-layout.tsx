export default function AffiliateFooterLayout() {
    return (
        <footer className="border-t border-t-gray-800 bg-surface-dark pt-16 pb-8">
            <div className="mx-auto w-full max-w-7xl px-4 md:px-10">
                <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3 text-white">
                            <div className="flex size-8 items-center justify-center text-tiktok-pink">
                                <span className="material-symbols-outlined text-3xl drop-shadow-[2px_2px_0px_#00f2ea]">
                                    music_note
                                </span>
                            </div>
                            <h2 className="text-lg leading-tight font-bold tracking-[-0.015em] text-white">
                                Affiliate
                                <span className="text-tiktok-cyan">
                                    Mastery
                                </span>
                            </h2>
                        </div>
                        <p className="max-w-xs text-sm leading-relaxed text-text-muted">
                            Platform belajar terbaik untuk menguasai TikTok
                            Affiliate. Mulai dari nol hingga menghasilkan jutaan
                            rupiah per bulan.
                        </p>
                        <div className="mt-2 flex gap-4">
                            <a
                                className="bg-background-dark flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-text-muted transition-colors hover:bg-tiktok-black hover:text-tiktok-cyan"
                                href="#"
                            >
                                <span className="material-symbols-outlined text-lg">
                                    music_note
                                </span>
                            </a>
                            <a
                                className="bg-background-dark flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-text-muted transition-colors hover:bg-tiktok-black hover:text-tiktok-pink"
                                href="#"
                            >
                                <span className="material-symbols-outlined text-lg">
                                    photo_camera
                                </span>
                            </a>
                            <a
                                className="bg-background-dark flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-text-muted transition-colors hover:bg-tiktok-black hover:text-red-500"
                                href="#"
                            >
                                <span className="material-symbols-outlined text-lg">
                                    play_arrow
                                </span>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="mb-6 text-lg font-bold text-white">
                            Program
                        </h3>
                        <ul className="flex flex-col gap-3">
                            <li>
                                <a
                                    className="text-sm text-text-muted transition-colors hover:text-tiktok-cyan"
                                    href="#"
                                >
                                    Tutorial
                                </a>
                            </li>
                            <li>
                                <a
                                    className="text-sm text-text-muted transition-colors hover:text-tiktok-cyan"
                                    href="#"
                                >
                                    Mentor
                                </a>
                            </li>
                            <li>
                                <a
                                    className="text-sm text-text-muted transition-colors hover:text-tiktok-cyan"
                                    href="#"
                                >
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a
                                    className="text-sm text-text-muted transition-colors hover:text-tiktok-cyan"
                                    href="#"
                                >
                                    Event
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-6 text-lg font-bold text-white">
                            Bantuan
                        </h3>
                        <ul className="flex flex-col gap-3">
                            <li>
                                <a
                                    className="text-sm text-text-muted transition-colors hover:text-tiktok-pink"
                                    href="#"
                                >
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a
                                    className="text-sm text-text-muted transition-colors hover:text-tiktok-pink"
                                    href="#"
                                >
                                    Hubungi Kami
                                </a>
                            </li>
                            <li>
                                <a
                                    className="text-sm text-text-muted transition-colors hover:text-tiktok-pink"
                                    href="#"
                                >
                                    Syarat &amp; Ketentuan
                                </a>
                            </li>
                            <li>
                                <a
                                    className="text-sm text-text-muted transition-colors hover:text-tiktok-pink"
                                    href="#"
                                >
                                    Kebijakan Privasi
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-6 text-lg font-bold text-white">
                            Newsletter
                        </h3>
                        <p className="mb-4 text-sm text-text-muted">
                            Dapatkan tips affiliate terbaru dan update materi
                            eksklusif.
                        </p>
                        <form className="flex flex-col gap-3">
                            <input
                                className="bg-background-dark w-full rounded-lg border border-gray-700 px-4 py-3 text-sm text-white transition-all placeholder:text-gray-600 focus:border-tiktok-cyan focus:ring-1 focus:ring-tiktok-cyan focus:outline-none"
                                placeholder="Email kamu"
                                type="email"
                            />
                            <button className="w-full rounded-lg bg-linear-to-r from-tiktok-cyan to-tiktok-pink px-4 py-3 text-sm font-bold text-white shadow-lg shadow-pink-500/20 transition-opacity hover:opacity-90">
                                Langganan
                            </button>
                        </form>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 md:flex-row">
                    <p className="text-sm text-gray-500">
                        © 2024 AffiliateMastery. Hak Cipta Dilindungi.
                    </p>
                    <div className="flex gap-6">
                        <a
                            className="text-sm text-gray-500 transition-colors hover:text-white"
                            href="#"
                        >
                            Privacy
                        </a>
                        <a
                            className="text-sm text-gray-500 transition-colors hover:text-white"
                            href="#"
                        >
                            Terms
                        </a>
                        <a
                            className="text-sm text-gray-500 transition-colors hover:text-white"
                            href="#"
                        >
                            Cookies
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
