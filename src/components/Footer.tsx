import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="absolute bottom-4 left-4 right-4 z-10 flex justify-between text-sm text-muted-foreground"
    >
      <p>© {new Date().getFullYear()} Kodacity. All rights reserved.</p>
      <p>Join 10,000+ developers mastering their craft</p>
    </motion.div>
  );
};

export default Footer;
