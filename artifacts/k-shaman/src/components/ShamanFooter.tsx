export function ShamanFooter() {
  return (
    <footer className="w-full border-t border-white/10 bg-gray-900/60 mt-auto">
      <div className="max-w-2xl mx-auto px-4 py-6 pb-20">
        <nav className="mb-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-gray-400" aria-label="서비스">
          <a href="https://mytesttype.com/palm-reading/" className="hover:text-white transition-colors">
            AI 손금
          </a>
          <a href="https://mytesttype.com/gwansang/" className="hover:text-white transition-colors">
            AI 관상
          </a>
          <a href="https://mytesttype.com/k-shaman/" className="hover:text-white transition-colors">
            K-Shaman AI 사주
          </a>
        </nav>
        <div className="text-xs text-gray-500 leading-relaxed text-center">
          <p>
            Lee Hyejin | 30, Deoksong 1-ro, Namyangju-si, Gyeonggi-do |
            proofcom26@gmail.com
          </p>
          <p>
            Notice: All content on MyTestType is provided for entertainment
            purposes only.
          </p>
          <p className="mt-1">
            <a
              href="https://mytesttype.com/privacy/"
              className="underline underline-offset-2 hover:text-gray-300 transition-colors"
            >
              개인정보 처리방침
            </a>
          </p>
          <p className="mt-1.5 text-gray-600">
            &copy; 2026 MyTestType. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
