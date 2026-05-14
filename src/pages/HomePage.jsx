import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Car, ShieldCheck, Zap, Heart, ArrowRight, Sparkles } from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: Car,
      title: 'Large catalogue',
      description: 'Des dizaines de véhicules sélectionnés pour vous, du citadin au SUV.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: ShieldCheck,
      title: 'Sécurisé',
      description: 'Toutes nos transactions sont chiffrées avec les dernières technologies.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Rapide',
      description: 'Déposez un dossier en moins de 3 minutes et obtenez une réponse rapide.',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Heart,
      title: 'Service client',
      description: 'Une équipe disponible et passionnée pour répondre à toutes vos questions.',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="overflow-hidden">
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary-400" />
              <span className="text-sm">Nouvelle plateforme 2026</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Votre prochain
              <br />
              <span className="gradient-text">véhicule vous attend</span>
            </h1>

            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              Achat, location, location longue durée. Plus de 50 véhicules sélectionnés avec soin pour répondre à tous vos besoins.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/vehicles" className="btn-primary inline-flex items-center justify-center gap-2 group">
                Voir les véhicules
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/register" className="btn-secondary">
                Créer un compte
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto"
            >
              {[
                { value: '50+', label: 'Véhicules' },
                { value: '100%', label: 'Sécurisé' },
                { value: '24/7', label: 'Support' }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-white/60 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Pourquoi <span className="gradient-text">M-Motors</span> ?
            </h2>
            <p className="text-white/60 text-lg">
              Une expérience pensée pour vous, du début à la fin.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card group"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-white/60 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="card text-center max-w-3xl mx-auto py-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Prêt à trouver votre véhicule ?
            </h2>
            <p className="text-white/60 mb-8">
              Inscrivez-vous gratuitement et déposez votre premier dossier en quelques minutes.
            </p>
            <Link to="/register" className="btn-primary inline-flex items-center gap-2">
              Commencer maintenant
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;