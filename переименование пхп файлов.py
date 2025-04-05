import os

# Получаем текущую директорию, в которой находится скрипт
current_directory = os.path.dirname(os.path.abspath(__file__))

# Перебираем все файлы в текущей директории
for filename in os.listdir(current_directory):
    # Проверяем, содержит ли имя файла нужный фрагмент
    if ".html" in filename:
        # Создаём новое имя, заменяя фрагмент
        new_filename = filename.replace(".html", ".html")
        
        # Формируем полные пути
        old_path = os.path.join(current_directory, filename)
        new_path = os.path.join(current_directory, new_filename)
        
        # Переименовываем файл
        os.rename(old_path, new_path)
        print(f'Renamed: {filename} -> {new_filename}')

print("Все файлы переименованы!")
