import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Translation resources
const resources = {
  en: {
    translation: {
      common: {
        appName: 'AccessPay',
        loading: 'Loading...',
        submit: 'Submit',
        cancel: 'Cancel',
        next: 'Next',
        back: 'Back',
        confirm: 'Confirm'
      },
      nav: {
        home: 'Home',
        payments: 'Payments',
        settings: 'Settings',
        skipToMain: 'Skip to main content'
      },
      payment: {
        title: 'Pay a Bill',
        selectPayee: 'Select Payee',
        enterAmount: 'Enter Amount',
        review: 'Review Payment',
        payee: 'Payee',
        amount: 'Amount',
        accountNumber: 'Account Number',
        success: 'Payment Successful',
        failure: 'Payment Failed',
        successMessage: 'Your payment of {{amount}} to {{payee}} has been processed.',
        failureMessage: 'We could not process your payment. Please try again.'
      },
      validation: {
        required: 'This field is required',
        invalidAmount: 'Amount must be greater than 0',
        invalidPayee: 'Please select a valid payee',
        formErrors: 'Your form has {{count}} error',
        formErrors_plural: 'Your form has {{count}} errors'
      },
      accessibility: {
        settings: 'Accessibility Settings',
        theme: 'Color Scheme',
        themeLight: 'Light',
        themeDark: 'Dark',
        themeHighContrast: 'High Contrast',
        fontSize: 'Font Size',
        fontSizeSmall: 'Small',
        fontSizeNormal: 'Normal',
        fontSizeLarge: 'Large',
        language: 'Language',
        voiceInput: 'Use voice input',
        voiceInputActive: 'Listening...',
        voiceInputInactive: 'Click to start voice input'
      },
      aria: {
        loading: 'Content is loading',
        formError: 'Form contains errors',
        required: 'required',
        optional: 'optional',
        menu: 'Menu',
        closeMenu: 'Close menu',
        openSettings: 'Open accessibility settings',
        closeSettings: 'Close accessibility settings'
      }
    }
  },
  es: {
    translation: {
      common: {
        appName: 'AccessPay',
        loading: 'Cargando...',
        submit: 'Enviar',
        cancel: 'Cancelar',
        next: 'Siguiente',
        back: 'Atrás',
        confirm: 'Confirmar'
      },
      nav: {
        home: 'Inicio',
        payments: 'Pagos',
        settings: 'Configuración',
        skipToMain: 'Saltar al contenido principal'
      },
      payment: {
        title: 'Pagar una Factura',
        selectPayee: 'Seleccionar Beneficiario',
        enterAmount: 'Ingresar Monto',
        review: 'Revisar Pago',
        payee: 'Beneficiario',
        amount: 'Monto',
        accountNumber: 'Número de Cuenta',
        success: 'Pago Exitoso',
        failure: 'Pago Fallido',
        successMessage: 'Su pago de {{amount}} a {{payee}} ha sido procesado.',
        failureMessage: 'No pudimos procesar su pago. Por favor, intente nuevamente.'
      },
      validation: {
        required: 'Este campo es obligatorio',
        invalidAmount: 'El monto debe ser mayor que 0',
        invalidPayee: 'Por favor seleccione un beneficiario válido',
        formErrors: 'Su formulario tiene {{count}} error',
        formErrors_plural: 'Su formulario tiene {{count}} errores'
      },
      accessibility: {
        settings: 'Configuración de Accesibilidad',
        theme: 'Esquema de Color',
        themeLight: 'Claro',
        themeDark: 'Oscuro',
        themeHighContrast: 'Alto Contraste',
        fontSize: 'Tamaño de Fuente',
        fontSizeSmall: 'Pequeño',
        fontSizeNormal: 'Normal',
        fontSizeLarge: 'Grande',
        language: 'Idioma',
        voiceInput: 'Usar entrada de voz',
        voiceInputActive: 'Escuchando...',
        voiceInputInactive: 'Haga clic para iniciar entrada de voz'
      },
      aria: {
        loading: 'El contenido se está cargando',
        formError: 'El formulario contiene errores',
        required: 'obligatorio',
        optional: 'opcional',
        menu: 'Menú',
        closeMenu: 'Cerrar menú',
        openSettings: 'Abrir configuración de accesibilidad',
        closeSettings: 'Cerrar configuración de accesibilidad'
      }
    }
  },
  ar: {
    translation: {
      common: {
        appName: 'AccessPay',
        loading: 'جاري التحميل...',
        submit: 'إرسال',
        cancel: 'إلغاء',
        next: 'التالي',
        back: 'رجوع',
        confirm: 'تأكيد'
      },
      nav: {
        home: 'الرئيسية',
        payments: 'المدفوعات',
        settings: 'الإعدادات',
        skipToMain: 'انتقل إلى المحتوى الرئيسي'
      },
      payment: {
        title: 'دفع فاتورة',
        selectPayee: 'اختر المستفيد',
        enterAmount: 'أدخل المبلغ',
        review: 'مراجعة الدفع',
        payee: 'المستفيد',
        amount: 'المبلغ',
        accountNumber: 'رقم الحساب',
        success: 'الدفع ناجح',
        failure: 'فشل الدفع',
        successMessage: 'تم معالجة دفعتك بمبلغ {{amount}} إلى {{payee}}.',
        failureMessage: 'لم نتمكن من معالجة دفعتك. يرجى المحاولة مرة أخرى.'
      },
      validation: {
        required: 'هذا الحقل مطلوب',
        invalidAmount: 'يجب أن يكون المبلغ أكبر من 0',
        invalidPayee: 'يرجى اختيار مستفيد صالح',
        formErrors: 'النموذج الخاص بك يحتوي على {{count}} خطأ',
        formErrors_plural: 'النموذج الخاص بك يحتوي على {{count}} أخطاء'
      },
      accessibility: {
        settings: 'إعدادات إمكانية الوصول',
        theme: 'نظام الألوان',
        themeLight: 'فاتح',
        themeDark: 'داكن',
        themeHighContrast: 'تباين عالي',
        fontSize: 'حجم الخط',
        fontSizeSmall: 'صغير',
        fontSizeNormal: 'عادي',
        fontSizeLarge: 'كبير',
        language: 'اللغة',
        voiceInput: 'استخدام إدخال الصوت',
        voiceInputActive: 'جاري الاستماع...',
        voiceInputInactive: 'انقر لبدء إدخال الصوت'
      },
      aria: {
        loading: 'جاري تحميل المحتوى',
        formError: 'النموذج يحتوي على أخطاء',
        required: 'مطلوب',
        optional: 'اختياري',
        menu: 'القائمة',
        closeMenu: 'إغلاق القائمة',
        openSettings: 'فتح إعدادات إمكانية الوصول',
        closeSettings: 'إغلاق إعدادات إمكانية الوصول'
      }
    }
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  })

export default i18n