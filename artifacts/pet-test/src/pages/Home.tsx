import { useLocation } from "wouter";
import { motion } from "framer-motion";

export default function Home() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-[#FDF8F2] flex flex-col items-center justify-center px-4 py-10">
      <motion.div
        className="w-full max-w-sm text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-6xl mb-3"
          animate={{ rotate: [0, -8, 8, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          🐾
        </motion.div>

        <h1 className="text-3xl font-extrabold text-[#3D2B1F] leading-tight mb-2">
          우리집 반려동물<br />성격 유형은?
        </h1>
        <p className="text-base text-[#8B6650] mt-2 mb-8 leading-relaxed">
          우리 아이의 숨겨진 성향을<br />15문항으로 알아보세요!
        </p>

        <div className="space-y-4">
          <motion.button
            className="w-full bg-[#F97316] hover:bg-[#EA6C0F] text-white rounded-3xl py-5 px-6 font-bold text-xl shadow-lg flex items-center justify-between transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/quiz/dog")}
          >
            <span className="text-3xl">🐕</span>
            <span className="flex-1 text-center">강아지용 테스트</span>
            <span className="text-xl opacity-60">→</span>
          </motion.button>

          <motion.button
            className="w-full bg-[#A855F7] hover:bg-[#9333EA] text-white rounded-3xl py-5 px-6 font-bold text-xl shadow-lg flex items-center justify-between transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/quiz/cat")}
          >
            <span className="text-3xl">🐈</span>
            <span className="flex-1 text-center">고양이용 테스트</span>
            <span className="text-xl opacity-60">→</span>
          </motion.button>
        </div>

        <p className="mt-8 text-xs text-[#C5A898]">
          총 15문항 · 약 3분 소요
        </p>
      </motion.div>
    </div>
  );
}
