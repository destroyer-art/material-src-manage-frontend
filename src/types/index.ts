export interface Inventory {
  id: number;
  product_number: string;
  material: string;
  form: string;
  choice: string;
  grade: string;
  finish: string;
  surface: string;
  quantity: number;
  weight: number;
  length: number;
  width: number;
  height: number;
  thickness: number;
  outer_diameter: number;
  wall_thickness: number;
  web_thickness: number;
  flange_thickness: number;
  certificates: string;
  location: string;
}

export interface Preference {
  material: string;
  form: string;
  grade: string;
  choice: string;
  min_width: number;
  max_width: number;
  min_thickness: number;
  max_thickness: number;
}
