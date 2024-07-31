// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

extern crate rusqlite;
use std::env;

use comb_program::{
    data::sqlite::*,
    dtos::{
        input_parameter_dtos::{CreateInputParameterRequestDto, UpdateInputParameterRequestDto},
        input_value_dtos::{CreateInputValueRequestDto, UpdateInputValueRequestDto},
        layer_dtos::{
            CreateLayerRequestDto, UpdateLayerImageRequestDto, UpdateLayerInfoRequestDto,
        }, output_parameter_dtos::{CreateOutputParameterRequestDto, UpdateOutputParameterRequestDto}, output_value_dtos::CreateOutputValueRequestDto,
    },
    mappers::{
        input_parameter_mappers::to_input_parameter_from_create_dto,
        input_value_mappers::to_input_value_from_create_dto,
        layer_mappers::to_layer_from_create_dto, output_parameter_mappers::to_output_parameter_from_create_dto, output_value_mappers::to_output_value_from_create_dto,
    },
    models::{InputParameter, InputValue, Layer, OutputParameter, OutputValue},
};

struct DbConnection(String);

#[tauri::command]
fn get_layers_by_prev_id(
    prev_id: Option<i64>,
    connection_string: tauri::State<DbConnection>,
) -> Result<Vec<Layer>, String> {
    dbcontext::init(connection_string.0.as_str());

    if let Ok(layers) = repositories::layer_repository::get_all(connection_string.0.as_str()) {
        return Ok(layers
            .into_iter()
            .filter(|x| x.prev_layer_id == prev_id)
            .collect());
    }
    Err("Ошибка получения данных".to_string())
}

#[tauri::command]
fn get_layer_by_id(
    id: i64,
    connection_string: tauri::State<DbConnection>,
) -> Result<Layer, String> {
    dbcontext::init(connection_string.0.as_str());

    if let Ok(layer) = repositories::layer_repository::get_by_id(id, connection_string.0.as_str()) {
        return Ok(layer);
    }
    Err("Ошибка получения данных".to_string())
}

#[tauri::command]
fn create_layer(
    layer_dto: CreateLayerRequestDto,
    connection_string: tauri::State<DbConnection>,
) -> Result<Layer, String> {
    dbcontext::init(connection_string.0.as_str());

    let mut layer = to_layer_from_create_dto(layer_dto);
    if let Err(_) = repositories::layer_repository::create(&mut layer, connection_string.0.as_str())
    {
        return Err("Ошибка создания".to_string());
    }
    Ok(layer)
}

#[tauri::command]
fn update_layer_info(
    id: i64,
    layer_dto: UpdateLayerInfoRequestDto,
    connection_string: tauri::State<DbConnection>,
) -> Result<Layer, String> {
    dbcontext::init(connection_string.0.as_str());

    if let Some(prev_layer_id) = layer_dto.prev_layer_id {
        if let Ok(flag) =
            repositories::layer_repository::exists(prev_layer_id, connection_string.0.as_str())
        {
            if !flag {
                return Err("Предыдущий слой не существует".to_string());
            }
        } else {
            return Err("Ошибка получения данных".to_string());
        }
    }

    if let Ok(mut layer) =
        repositories::layer_repository::get_by_id(id, connection_string.0.as_str())
    {
        layer.prev_layer_id = layer_dto.prev_layer_id;
        layer.is_final = layer_dto.is_final;
        layer.name = layer_dto.name;
        layer.description = layer_dto.description;

        if let Ok(_) = repositories::layer_repository::update(&layer, connection_string.0.as_str())
        {
            return Ok(layer);
        }
    }

    return Err("Ошибка получения данных".to_string());
}

#[tauri::command]
fn update_layer_image(
    id: i64,
    layer_dto: UpdateLayerImageRequestDto,
    connection_string: tauri::State<DbConnection>,
) -> Result<Layer, String> {
    dbcontext::init(connection_string.0.as_str());

    if let Ok(mut layer) =
        repositories::layer_repository::get_by_id(id, connection_string.0.as_str())
    {
        layer.image = layer_dto.image;
        layer.image_format = layer_dto.image_format;

        if let Ok(_) = repositories::layer_repository::update(&layer, connection_string.0.as_str())
        {
            return Ok(layer);
        }
    }

    return Err("Ошибка получения данных".to_string());
}

#[tauri::command]
fn delete_layer(id: i64, connection_string: tauri::State<DbConnection>) -> Result<(), String> {
    dbcontext::init(connection_string.0.as_str());

    if let Err(_) = repositories::layer_repository::remove_by_id(id, connection_string.0.as_str()) {
        return Err("Ошибка удаления".to_string());
    }
    Ok(())
}

#[tauri::command]
fn get_input_parameters_by_layer_id(
    layer_id: i64,
    connection_string: tauri::State<DbConnection>,
) -> Result<Vec<InputParameter>, String> {
    dbcontext::init(connection_string.0.as_str());

    if let Ok(flag) = repositories::layer_repository::exists(layer_id, connection_string.0.as_str())
    {
        if !flag {
            return Err("Cлой не существует".to_string());
        }
    } else {
        return Err("Ошибка получения данных".to_string());
    }

    if let Ok(flag) =
        repositories::layer_repository::is_final(layer_id, connection_string.0.as_str())
    {
        if !flag {
            return Err("Cлой не конечный".to_string());
        }
    } else {
        return Err("Ошибка получения данных".to_string());
    }

    if let Ok(input_parameters) =
        repositories::input_parameter_repository::get_all(connection_string.0.as_str())
    {
        return Ok(input_parameters
            .into_iter()
            .filter(|x| x.layer_id == layer_id)
            .collect());
    }
    Err("Ошибка получения данных".to_string())
}

#[tauri::command]
fn get_input_parameter_by_id(
    id: i64,
    connection_string: tauri::State<DbConnection>,
) -> Result<InputParameter, String> {
    dbcontext::init(connection_string.0.as_str());

    if let Ok(input_parameter) =
        repositories::input_parameter_repository::get_by_id(id, connection_string.0.as_str())
    {
        return Ok(input_parameter);
    }

    Err("Ошибка получения данных".to_string())
}

#[tauri::command]
fn create_input_parameter(
    layer_id: i64,
    input_parameter_dto: CreateInputParameterRequestDto,
    connection_string: tauri::State<DbConnection>,
) -> Result<InputParameter, String> {
    dbcontext::init(connection_string.0.as_str());

    let mut input_parameter = to_input_parameter_from_create_dto(layer_id, input_parameter_dto);
    if let Err(_) = repositories::input_parameter_repository::create(
        &mut input_parameter,
        connection_string.0.as_str(),
    ) {
        return Err("Ошибка создания".to_string());
    }

    Ok(input_parameter)
}

#[tauri::command]
fn update_input_parameter(
    id: i64,
    input_parameter_dto: UpdateInputParameterRequestDto,
    connection_string: tauri::State<DbConnection>,
) -> Result<InputParameter, String> {
    dbcontext::init(connection_string.0.as_str());

    if let Ok(flag) = repositories::layer_repository::exists(
        input_parameter_dto.layer_id,
        connection_string.0.as_str(),
    ) {
        if !flag {
            return Err("Слой не существует".to_string());
        }
    } else {
        return Err("Ошибка получения данных".to_string());
    }

    if let Ok(mut input_parameter) =
        repositories::input_parameter_repository::get_by_id(id, connection_string.0.as_str())
    {
        input_parameter.layer_id = input_parameter_dto.layer_id;
        input_parameter.name = input_parameter_dto.name;

        if let Ok(_) = repositories::input_parameter_repository::update(
            &input_parameter,
            connection_string.0.as_str(),
        ) {
            return Ok(input_parameter);
        }
    }

    Err("Ошибка получения данных".to_string())
}

#[tauri::command]
fn delete_input_parameter(
    id: i64,
    connection_string: tauri::State<DbConnection>,
) -> Result<(), String> {
    dbcontext::init(connection_string.0.as_str());

    if let Err(_) =
        repositories::input_parameter_repository::remove_by_id(id, connection_string.0.as_str())
    {
        return Err("Ошибка удаления".to_string());
    }
    Ok(())
}

#[tauri::command]
fn get_input_values_by_input_parameter_id(
    input_parameter_id: i64,
    connection_string: tauri::State<DbConnection>,
) -> Result<Vec<InputValue>, String> {
    dbcontext::init(connection_string.0.as_str());

    if let Ok(flag) = repositories::input_parameter_repository::exists(
        input_parameter_id,
        connection_string.0.as_str(),
    ) {
        if !flag {
            return Err("Входной параметр не существует".to_string());
        }
    } else {
        return Err("Ошибка получения данных".to_string());
    }

    if let Ok(input_values) =
        repositories::input_value_repository::get_all(connection_string.0.as_str())
    {
        return Ok(input_values
            .into_iter()
            .filter(|x| x.input_parameter_id == input_parameter_id)
            .collect());
    }
    Err("Ошибка получения данных".to_string())
}

#[tauri::command]
fn get_input_value_by_id(
    id: i64,
    connection_string: tauri::State<DbConnection>,
) -> Result<InputValue, String> {
    dbcontext::init(connection_string.0.as_str());

    if let Ok(input_value) =
        repositories::input_value_repository::get_by_id(id, connection_string.0.as_str())
    {
        return Ok(input_value);
    }

    Err("Ошибка получения данных".to_string())
}

#[tauri::command]
fn create_input_value(
    input_parameter_id: i64,
    input_value_dto: CreateInputValueRequestDto,
    connection_string: tauri::State<DbConnection>,
) -> Result<InputValue, String> {
    dbcontext::init(connection_string.0.as_str());

    let mut input_value = to_input_value_from_create_dto(input_parameter_id, input_value_dto);
    if let Err(_) =
        repositories::input_value_repository::create(&mut input_value, connection_string.0.as_str())
    {
        return Err("Ошибка создания".to_string());
    }

    Ok(input_value)
}

#[tauri::command]
fn update_input_value(
    id: i64,
    input_value_dto: UpdateInputValueRequestDto,
    connection_string: tauri::State<DbConnection>,
) -> Result<InputValue, String> {
    dbcontext::init(connection_string.0.as_str());

    if let Ok(flag) = repositories::input_parameter_repository::exists(
        input_value_dto.input_parameter_id,
        connection_string.0.as_str(),
    ) {
        if !flag {
            return Err("Входной параметр не существует".to_string());
        }
    } else {
        return Err("Ошибка получения данных".to_string());
    }

    if let Ok(mut input_value) =
        repositories::input_value_repository::get_by_id(id, connection_string.0.as_str())
    {
        input_value.input_parameter_id = input_value_dto.input_parameter_id;
        input_value.value = input_value_dto.value;

        if let Ok(_) =
            repositories::input_value_repository::update(&input_value, connection_string.0.as_str())
        {
            return Ok(input_value);
        }
    }

    Err("Ошибка получения данных".to_string())
}

#[tauri::command]
fn delete_input_value(
    id: i64,
    connection_string: tauri::State<DbConnection>,
) -> Result<(), String> {
    dbcontext::init(connection_string.0.as_str());

    if let Err(_) =
        repositories::input_value_repository::remove_by_id(id, connection_string.0.as_str())
    {
        return Err("Ошибка удаления".to_string());
    }
    Ok(())
}

#[tauri::command]
fn get_output_parameters_by_layer_id(
    layer_id: i64,
    connection_string: tauri::State<DbConnection>,
) -> Result<Vec<OutputParameter>, String> {
    dbcontext::init(connection_string.0.as_str());

    if let Ok(flag) = repositories::layer_repository::exists(layer_id, connection_string.0.as_str())
    {
        if !flag {
            return Err("Cлой не существует".to_string());
        }
    } else {
        return Err("Ошибка получения данных".to_string());
    }

    if let Ok(flag) =
        repositories::layer_repository::is_final(layer_id, connection_string.0.as_str())
    {
        if !flag {
            return Err("Cлой не конечный".to_string());
        }
    } else {
        return Err("Ошибка получения данных".to_string());
    }

    if let Ok(input_parameters) =
        repositories::output_parameter_repository::get_all(connection_string.0.as_str())
    {
        return Ok(input_parameters
            .into_iter()
            .filter(|x| x.layer_id == layer_id)
            .collect());
    }
    Err("Ошибка получения данных".to_string())
}

#[tauri::command]
fn get_output_parameter_by_id(
    id: i64,
    connection_string: tauri::State<DbConnection>,
) -> Result<OutputParameter, String> {
    dbcontext::init(connection_string.0.as_str());

    if let Ok(output_parameter) =
        repositories::output_parameter_repository::get_by_id(id, connection_string.0.as_str())
    {
        return Ok(output_parameter);
    }

    Err("Ошибка получения данных".to_string())
}

#[tauri::command]
fn create_output_parameter(
    layer_id: i64,
    output_parameter_dto: CreateOutputParameterRequestDto,
    connection_string: tauri::State<DbConnection>,
) -> Result<OutputParameter, String> {
    dbcontext::init(connection_string.0.as_str());

    let mut output_parameter = to_output_parameter_from_create_dto(layer_id, output_parameter_dto);
    if let Err(_) = repositories::output_parameter_repository::create(
        &mut output_parameter,
        connection_string.0.as_str(),
    ) {
        return Err("Ошибка создания".to_string());
    }

    Ok(output_parameter)
}

#[tauri::command]
fn update_output_parameter(
    id: i64,
    output_parameter_dto: UpdateOutputParameterRequestDto,
    connection_string: tauri::State<DbConnection>,
) -> Result<OutputParameter, String> {
    dbcontext::init(connection_string.0.as_str());

    if let Ok(flag) = repositories::layer_repository::exists(
        output_parameter_dto.layer_id,
        connection_string.0.as_str(),
    ) {
        if !flag {
            return Err("Слой не существует".to_string());
        }
    } else {
        return Err("Ошибка получения данных".to_string());
    }

    if let Ok(mut output_parameter) =
        repositories::output_parameter_repository::get_by_id(id, connection_string.0.as_str())
    {
        output_parameter.layer_id = output_parameter_dto.layer_id;
        output_parameter.name = output_parameter_dto.name;

        if let Ok(_) = repositories::output_parameter_repository::update(
            &output_parameter,
            connection_string.0.as_str(),
        ) {
            return Ok(output_parameter);
        }
    }

    Err("Ошибка получения данных".to_string())
}

#[tauri::command]
fn delete_output_parameter(
    id: i64,
    connection_string: tauri::State<DbConnection>,
) -> Result<(), String> {
    dbcontext::init(connection_string.0.as_str());

    if let Err(_) =
        repositories::output_parameter_repository::remove_by_id(id, connection_string.0.as_str())
    {
        return Err("Ошибка удаления".to_string());
    }
    Ok(())
}

#[tauri::command]
fn get_output_values_by_output_parameter_id(
    output_parameter_id: i64,
    connection_string: tauri::State<DbConnection>,
) -> Result<Vec<OutputValue>, String> {
    dbcontext::init(connection_string.0.as_str());

    if let Ok(flag) = repositories::output_parameter_repository::exists(
        output_parameter_id,
        connection_string.0.as_str(),
    ) {
        if !flag {
            return Err("Выходной параметр не существует".to_string());
        }
    } else {
        return Err("Ошибка получения данных".to_string());
    }

    if let Ok(input_values) =
        repositories::output_value_repository::get_all(connection_string.0.as_str())
    {
        return Ok(input_values
            .into_iter()
            .filter(|x| x.output_parameter_id == output_parameter_id)
            .collect());
    }
    Err("Ошибка получения данных".to_string())
}

#[tauri::command]
fn get_output_value_by_id(
    input_value_id: i64,
    output_parameter_id: i64,
    connection_string: tauri::State<DbConnection>,
) -> Result<OutputValue, String> {
    dbcontext::init(connection_string.0.as_str());

    if let Ok(output_value) =
        repositories::output_value_repository::get_by_id(input_value_id, output_parameter_id, connection_string.0.as_str())
    {
        return Ok(output_value);
    }

    Err("Ошибка получения данных".to_string())
}

#[tauri::command]
fn create_output_value(
    input_value_id: i64,
    output_parameter_id: i64,
    output_value_dto: CreateOutputValueRequestDto,
    connection_string: tauri::State<DbConnection>,
) -> Result<OutputValue, String> {
    dbcontext::init(connection_string.0.as_str());

    let mut output_value = to_output_value_from_create_dto(input_value_id, output_parameter_id, output_value_dto);
    if let Err(_) =
        repositories::output_value_repository::create(&mut output_value, connection_string.0.as_str())
    {
        return Err("Ошибка создания".to_string());
    }

    Ok(output_value)
}

#[tauri::command]
fn update_output_value(
    input_value_id: i64,
    output_parameter_id: i64,
    output_value_dto: UpdateInputValueRequestDto,
    connection_string: tauri::State<DbConnection>,
) -> Result<OutputValue, String> {
    dbcontext::init(connection_string.0.as_str());

    if let Ok(flag) = repositories::input_value_repository::exists(
        input_value_id,
        connection_string.0.as_str(),
    ) {
        if !flag {
            return Err("Входного значения не существует".to_string());
        }
    } else {
        return Err("Ошибка получения данных".to_string());
    }

    if let Ok(flag) = repositories::output_parameter_repository::exists(
        output_parameter_id,
        connection_string.0.as_str(),
    ) {
        if !flag {
            return Err("Выходного параметра не существует".to_string());
        }
    } else {
        return Err("Ошибка получения данных".to_string());
    }

    if let Ok(mut output_value) =
        repositories::output_value_repository::get_by_id(input_value_id, output_parameter_id, connection_string.0.as_str())
    {
        output_value.value = output_value_dto.value;

        if let Ok(_) =
            repositories::output_value_repository::update(&output_value, connection_string.0.as_str())
        {
            return Ok(output_value);
        }
    }

    Err("Ошибка получения данных".to_string())
}

#[tauri::command]
fn delete_output_value(
    input_value_id: i64,
    output_parameter_id: i64,
    connection_string: tauri::State<DbConnection>,
) -> Result<(), String> {
    dbcontext::init(connection_string.0.as_str());

    if let Err(_) =
        repositories::output_value_repository::remove_by_id(input_value_id, output_parameter_id, connection_string.0.as_str())
    {
        return Err("Ошибка удаления".to_string());
    }
    Ok(())
}

fn main() {
    let current_exe_path = env::current_exe().expect("Failed to get current executable path");
    let exe_dir = current_exe_path
        .parent()
        .expect("Failed to get parent directory of executable");
    let dir_path = exe_dir.join("main.db").to_str().unwrap().to_string();

    dbcontext::init(&dir_path);

    tauri::Builder::default()
        .manage(DbConnection(dir_path))
        .invoke_handler(tauri::generate_handler![
            get_layers_by_prev_id,
            get_layer_by_id,
            create_layer,
            update_layer_info,
            update_layer_image,
            delete_layer,
            get_input_parameters_by_layer_id,
            get_input_parameter_by_id,
            create_input_parameter,
            update_input_parameter,
            delete_input_parameter,
            get_input_values_by_input_parameter_id,
            get_input_value_by_id,
            create_input_value,
            update_input_value,
            delete_input_value,
            get_output_parameters_by_layer_id,
            get_output_parameter_by_id,
            create_output_parameter,
            update_output_parameter,
            delete_output_parameter,
            get_output_values_by_output_parameter_id,
            get_output_value_by_id,
            create_output_value,
            update_output_value,
            delete_output_value,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
