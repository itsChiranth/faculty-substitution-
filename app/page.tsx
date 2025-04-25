import LoginForm from "@/components/login-form"

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e6f7f5] to-[#f5e6f7]">
      <div className="w-full max-w-md p-8 relative">
        {/* Decorative elements */}
        <div
          className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-primary/20 animate-float"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute -bottom-10 -right-10 w-16 h-16 rounded-full bg-secondary/20 animate-float"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute top-1/2 -right-5 w-10 h-10 rounded-full bg-primary/10 animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/4 -left-5 w-8 h-8 rounded-full bg-secondary/10 animate-float"
          style={{ animationDelay: "1.5s" }}
        ></div>

        <div className="text-center mb-8 relative z-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Faculty Substitution
          </h1>
          <p className="text-gray-600 mt-2">Login to access your dashboard</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
