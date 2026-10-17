import {
  Award, ArrowRight, BarChart3, Building, Building2, Car, CheckCircle, ClipboardList, Compass,
  Droplets, Factory, Handshake, HardHat, Hammer, Key, Layers, Leaf, Lightbulb, MapPin, Monitor,
  Mountain, Package, PenTool, Paintbrush, Pill, Play, Settings, Shield, Star, Truck, User,
  UtensilsCrossed, Warehouse, Wrench, Zap, type LucideIcon,
} from "lucide-react";

// Icons the admin can choose from. Keys are stored in the database.
export const ICONS: Record<string, LucideIcon> = {
  Award, ArrowRight, BarChart3, Building, Building2, Car, CheckCircle, ClipboardList, Compass,
  Droplets, Factory, Handshake, HardHat, Hammer, Key, Layers, Leaf, Lightbulb, MapPin, Monitor,
  Mountain, Package, PenTool, Paintbrush, Pill, Play, Settings, Shield, Star, Truck, User,
  UtensilsCrossed, Warehouse, Wrench, Zap,
};

export const ICON_NAMES = Object.keys(ICONS);

export const getIcon = (name?: string): LucideIcon => (name && ICONS[name]) || Star;
