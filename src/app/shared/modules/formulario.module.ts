import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { StyleClassModule } from 'primeng/styleclass';
import { DatePickerModule } from 'primeng/datepicker';
import { TableModule } from 'primeng/table';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { PopoverModule } from 'primeng/popover';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FluidModule } from 'primeng/fluid';
import { ColorPickerModule } from 'primeng/colorpicker';

@NgModule({
  imports: [
    CommonModule,
    StyleClassModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    SelectModule,
    TextareaModule,
    DatePickerModule,
    TableModule,
    ToggleSwitchModule,
    CheckboxModule,
    RadioButtonModule,
    NgxMaskDirective,
    NgxMaskPipe,
    PopoverModule,
    MessageModule,
    MultiSelectModule,
    ConfirmDialogModule,
    ToastModule,
    FluidModule,
    ColorPickerModule
  ],
  exports: [
    CommonModule,
    StyleClassModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    SelectModule,
    TextareaModule,
    TableModule,
    ToggleSwitchModule,
    CheckboxModule,
    RadioButtonModule,
    NgxMaskDirective,
    NgxMaskPipe,
    PopoverModule,
    MessageModule,
    MultiSelectModule,
    ConfirmDialogModule,
    ToastModule,
    FluidModule,
    ColorPickerModule
  ]
})
export class FormularioModule { }

