// Cliente Supabase + métodos de busca. Credenciais públicas em scripts/config.js (funciona local e na Vercel).
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config.js";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const SEL = "*, goleiro(*), linha(*)";
const um = (x) => (Array.isArray(x) ? x[0] : x) ?? null; // relação 1:1 pode vir como objeto ou array
const normaliza = (j) => ({ ...j, goleiro: um(j.goleiro), linha: um(j.linha) });
const ok = ({ data, error }) => {
  if (error) throw error;
  return data;
};

export const getTimes = async () =>
  ok(await supabase.from("time").select("*").order("nome"));
export const getTime = async (nome) =>
  ok(await supabase.from("time").select("*").eq("nome", nome).single());
export const getElenco = async (time) =>
  ok(await supabase.from("jogador").select(SEL).eq("time_nome", time)).map(
    normaliza,
  );
