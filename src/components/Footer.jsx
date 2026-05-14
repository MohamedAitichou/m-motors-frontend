import { Car, Mail, Phone, Code } from 'lucide-react';

const Footer = () => (
  <footer className="glass border-t border-white/10 mt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary-500 to-purple-500">
              <Car className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">M-Motors</span>
          </div>
          <p className="text-white/60 text-sm">
            Location et achat de véhicules.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Contact</h3>
          <div className="space-y-2 text-sm text-white/60">
            <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> contact@m-motors.com</div>
            <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> 01 23 45 67 89</div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Liens</h3>
          <div className="space-y-2 text-sm text-white/60">
            <a href="https://github.com/MohamedAitichou/m-motors-frontend" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary-400 transition">
              <Code className="w-4 h-4" /> Code source
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-white/40">
        © 2026 M-Motors.
      </div>
    </div>
  </footer>
);

export default Footer;