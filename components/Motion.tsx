import { motion } from "framer-motion";
import { chakra } from "@chakra-ui/react";
import { Grid } from '@chakra-ui/react';

export const MotionMain = chakra(motion.main);
export const MotionBox = motion(chakra.div);
export const MotionGrid = motion(Grid)