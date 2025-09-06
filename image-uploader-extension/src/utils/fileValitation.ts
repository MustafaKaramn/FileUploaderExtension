// src/utils/validation.ts

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

// Fonksiyonumuzun döndüreceği objenin tipini belirliyoruz.
// Bu sayede hem geçerli olup olmadığını hem de hata mesajını tek seferde alabiliriz.
interface ValidationResult {
    isValid: boolean;
    error: string | null;
}

export function validateFile(file: File): ValidationResult {
    // 1. Dosya Tipi Kontrolü
    if (!ALLOWED_TYPES.includes(file.type)) {
        return {
            isValid: false,
            error: `Geçersiz dosya tipi. Lütfen sadece resim yükleyin (${ALLOWED_TYPES.join(', ')})`,
        };
    }

    // 2. Dosya Boyutu Kontrolü
    if (file.size > MAX_FILE_SIZE_BYTES) {
        return {
            isValid: false,
            error: `Dosya boyutu çok büyük. Maksimum ${MAX_FILE_SIZE_MB}MB olabilir.`,
        };
    }

    // Tüm kontrollerden geçerse
    return {
        isValid: true,
        error: null,
    };
}