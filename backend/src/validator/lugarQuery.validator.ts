function contemCaracteresInvalidos(texto: string): boolean {
  const padrao = /[;'"<>\|$\\=%+?_]|--|\/\*|\*\//;

  return padrao.test(texto);
}


export function validarBusca(query:string){
  if(contemCaracteresInvalidos(query)==false && query.length < 100){
    return query;
  }
}



//  ============================================================
// search-validator.ts
// ============================================================

interface ValidationResult {
  isValid: boolean;
  sanitizedTerm: string;
  errors: string[];
}

interface SearchConfig {
  minLength?: number;
  maxLength?: number;
  allowedPattern?: RegExp;
  forbiddenTerms?: string[];
  maxResults?: number;
}

const DEFAULT_CONFIG: Required<SearchConfig> = {
  minLength: 2,
  maxLength: 100,
  allowedPattern: /^[a-zA-Z0-9\s\-àáâãäåæçèéêëìíîïðñòóôõöøùúûüýÿ]+$/i,
  forbiddenTerms: ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'DROP', 'UNION', 'EXEC', 'SCRIPT', 'JAVASCRIPT'],
  maxResults: 50,
};

// ── 1. NORMALIZAÇÃO UNICODE ──
function normalizeInput(input: string): string {
  return input
    .normalize('NFC')                    // Normaliza caracteres Unicode
    .trim()                              // Remove espaços nas extremidades
    .replace(/\s+/g, ' ');               // Colapsa múltiplos espaços
}

// ── 2. VALIDAÇÃO DE COMPRIMENTO ──
function validateLength(term: string, min: number, max: number): string | null {
  if (term.length < min) return `Termo muito curto (mínimo ${min} caracteres)`;
  if (term.length > max) return `Termo muito longo (máximo ${max} caracteres)`;
  return null;
}

// ── 3. WHITELIST DE CARACTERES ──
function validateCharacters(term: string, pattern: RegExp): string | null {
  if (!pattern.test(term)) {
    return 'Termo contém caracteres não permitidos';
  }
  return null;
}

// ── 4. PREVENÇÃO DE PATH TRAVERSAL / LFI ──
function containsPathTraversal(term: string): boolean {
  const dangerousPatterns = [
    /\.\.\//,           // ../
    /\.\.\\/,           // ..\
    /%2e%2e%2f/i,       // URL-encoded ../
    /%2e%2e%5c/i,       // URL-encoded ..\
    /\.\.%2f/i,         // Mixed encoding
    /\.\.%5c/i,
    /~\/|\$HOME|C:\\/i, // Caminhos absolutos comuns
  ];
  return dangerousPatterns.some(p => p.test(term));
}

// ── 5. DETECÇÃO DE INJEÇÃO / COMANDOS ──
function containsForbiddenPatterns(term: string, forbiddenTerms: string[]): string | null {
  const upper = term.toUpperCase();
  
  // Verifica palavras-chave proibidas (SQL, comandos)
  for (const forbidden of forbiddenTerms) {
    if (upper.includes(forbidden)) {
      return `Termo contém padrão proibido: "${forbidden}"`;
    }
  }

  // Detecta padrões de SQL injection comuns
  const sqlPatterns = [
    /(\%27)|(\')|(\-\-)|(\%23)|(#)/i,           // Quotes e comentários
    /((\%3D)|(=))[^\n]*((\%27)|(\')|(\-\-)|(\%3B)|(;))/i, // = seguido de quote/comment
    /\w*((\%27)|(\'))((\%6F)|o|(\%4F))((\%72)|r|(\%52))/i, // 'or'
    /((\%27)|(\'))union/i,                       // 'union
    /exec(\s|\+)+(s|x)p\w+/i,                    // Stored procedures
  ];

  if (sqlPatterns.some(p => p.test(term))) {
    return 'Padrão suspeito de injeção detectado';
  }

  return null;
}

// ── 6. SANITIZAÇÃO ANTI-XSS ──
function escapeHtml(unsafe: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;',
  };
  return unsafe.replace(/[&<>"'`=/]/g, s => map[s]);
}

// ── 7. VALIDAÇÃO PRINCIPAL ──
export function validateSearchTerm( rawInput: string, config: SearchConfig = {}): ValidationResult {
  const cfg = { ...DEFAULT_CONFIG, ...config };
  const errors: string[] = [];

  // Rejeita input não-string
  if (typeof rawInput !== 'string') {
    return { isValid: false, sanitizedTerm: '', errors: ['Input inválido'] };
  }

  // Normaliza
  let term = normalizeInput(rawInput);

  // Comprimento
  const lengthError = validateLength(term, cfg.minLength, cfg.maxLength);
  if (lengthError) errors.push(lengthError);

  // Path traversal
  if (containsPathTraversal(term)) {
    errors.push('Padrão de path traversal detectado');
  }

  // Padrões proibidos
  const forbiddenError = containsForbiddenPatterns(term, cfg.forbiddenTerms);
  if (forbiddenError) errors.push(forbiddenError);

  // Caracteres permitidos (whitelist)
  const charError = validateCharacters(term, cfg.allowedPattern);
  if (charError) errors.push(charError);

  // Se houver erros críticos, não prossegue
  if (errors.length > 0) {
    return { isValid: false, sanitizedTerm: '', errors };
  }

  // Sanitiza para exibição segura
  const sanitizedTerm = escapeHtml(term);

  return {
    isValid: true,
    sanitizedTerm,
    errors: [],
  };
}

