"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Textarea from "@/components/ui/Textarea"; // Using our custom UI components
import Button from "@/components/ui/Button";

export default function LoginPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		try {
			const res = await signIn("credentials", {
				username,
				password,
				redirect: false,
			});

			if (res?.error) {
				setError("用户名或密码错误");
			} else {
				router.push("/");
				router.refresh();
			}
		} catch (err) {
			setError("登录过程中出现错误");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="h-screen w-full flex items-center justify-center p-4">
			<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="w-full max-w-sm bg-[#F6F5F3] paper-texture rounded-3xl shadow-2xl p-10 border border-white/50 relative overflow-hidden">
				{/* Background accent */}
				<div className="absolute -top-10 -right-10 w-32 h-32 bg-[#4F6D7A]/5 rounded-full blur-3xl" />
				<div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#E09F3E]/5 rounded-full blur-3xl" />

				<header className="text-center mb-10 relative">
					<h1 className="text-4xl font-serif font-bold text-[#1E1F24] mb-2 tracking-tight">TODO</h1>
					<p className="text-[#4F6D7A]/60 text-sm font-medium uppercase tracking-[0.2em]">TODO</p>
				</header>

				<form onSubmit={handleSubmit} className="space-y-6 relative">
					<div>
						<label className="block text-[10px] font-bold text-[#4F6D7A]/40 uppercase tracking-widest mb-2 ml-1">用户名</label>
						<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-white/60 border-b border-[#4F6D7A]/20 focus:border-[#e09f3e] py-3 px-1 text-lg text-[#1E1F24] placeholder:text-[#4F6D7A]/20 outline-none transition-all duration-300 font-light tracking-wide rounded-t-lg" placeholder="Username" required autoFocus />
					</div>

					<div>
						<label className="block text-[10px] font-bold text-[#4F6D7A]/40 uppercase tracking-widest mb-2 ml-1">密码</label>
						<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white/60 border-b border-[#4F6D7A]/20 focus:border-[#e09f3e] py-3 px-1 text-lg text-[#1E1F24] placeholder:text-[#4F6D7A]/20 outline-none transition-all duration-300 font-light tracking-wide rounded-t-lg" placeholder="••••••••" required />
					</div>

					{error && (
						<motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#c97c5d] text-xs font-medium bg-[#c97c5d]/5 p-3 rounded-xl border border-[#c97c5d]/10">
							{error}
						</motion.p>
					)}

					<Button type="submit" variant="primary" className="w-full py-4 text-base tracking-widest uppercase font-bold shadow-lg shadow-[#4F6D7A]/20" disabled={isLoading}>
						{isLoading ? "登录中..." : "登录"}
					</Button>
				</form>

				<footer className="mt-12 text-center text-[10px] text-[#4F6D7A]/30 uppercase tracking-[0.3em] font-medium border-t border-[#4F6D7A]/5 pt-6">Focus • Calm • Reflect</footer>
			</motion.div>
		</div>
	);
}
