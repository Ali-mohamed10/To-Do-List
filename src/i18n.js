import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      greeting: "TodoList Project",
      add_task: "Add Task",
      delete: "Delete",
      delete_confirm: "Are you sure you want to delete this task?",
      delete_warning: "You cannot undo this action after deletion.",
      close: "Close",
      confirm_delete: "Yes, delete it",
      edit_task: "Edit Task",
      title: "Title",
      details: "Details",
      cancel: "Cancel",
      edit: "Edit",
      dir: "ltr",
      not_completed: "Not Completed",
      completed: "Completed",
      all: "All",
      reset: "Reset",
      // أضف المزيد من النصوص حسب الحاجة
    },
  },
  ar: {
    translation: {
      greeting: "مشروع قائمة المهام",
      add_task: "أضف مهمة",
      delete: "حذف",
      delete_confirm: "هل انت متأكد من حذف المهمة؟",
      delete_warning: "لا يمكنك التراجع عن الحذف بعد اتمامه",
      close: "اغلاق",
      confirm_delete: "نعم قم بالحذف",
      edit_task: "تعديل المهمة",
      title: "العنوان",
      details: "التفاصيل",
      cancel: "الغاء",
      edit: "تعديل",
      dir: "rtl",
      not_completed: "الغير منجز",
      completed: "المنجز",
      all: "الكل",
      reset: "إعادة ضبط",
      // أضف المزيد من النصوص حسب الحاجة
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ar", // اللغة الافتراضية
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
